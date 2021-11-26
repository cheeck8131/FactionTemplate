import { FactionModel, FactionSchema } from "./database";
import { event, cmd } from "./decorators";
import { DocumentType } from "@typegoose/typegoose";

// Расширение интерфейса PlayerMp для хранения данных об приглашений и фракции в которой состоит игрок;
declare global {
  interface PlayerMp {
    inviteToFaction: Faction | null;
    faction: Faction | null;
  }
}

/*
 *Класс фракции
 */
export class Faction {
  protected declare document: DocumentType<FactionSchema>; // Документ базы данных фракции;
  protected name: string; // Название фракции;
  public location: Vector3Mp; // Место спавна;
  public static list: Faction[] = []; // Список всех фракций;

  // Инициализация фракции
  private inited = false;
  private async init() {
    console.log("faction", this.name, "init...");

    let doc = await FactionModel.findOne({ name: this.name });

    if (!doc) {
      const schema = new FactionSchema(this.name);
      doc = await FactionModel.create(schema);
    }

    this.inited = true;
    this.document = doc;

    if (!Faction.list.find((x) => !x.inited)) {
      // Если все фракции закончили инициализацию, то инициализировать сервер
      mp.events.delayInitialization = false;
      console.log("Factions inited");
    }
  }

  constructor(factionName: string, location: Vector3Mp) {
    this.name = factionName;
    this.location = location;
    Faction.list.push(this);

    this.init();
  }

  // Создание расширенных полей PlayerMp;
  @event(RageEnums.EventKey.ENTITY_CREATED)
  public playerCreated(entity: EntityMp) {
    if (entity.type === "player") {
      const player = <PlayerMp>entity;
      player.faction = null;
      player.inviteToFaction = null;
    }
  }

  // Спавн игрока в локации фракции;
  @event(RageEnums.EventKey.PLAYER_JOIN)
  public spawn(player: PlayerMp) {
    if (this.document.players.includes(player.rgscId)) {
      player.spawn(this.location);
      player.faction = this;
    }
  }

  public async invite(player: PlayerMp) {
    this.document.players.push(player.rgscId);
    player.faction = this;
    player.inviteToFaction = null;
    await this.document.save();
  }

  public async kick(player: PlayerMp) {
    this.document.players = this.document.players.filter(
      (x) => x !== player.rgscId
    ); // Удаление игрока из списка участников фракции
    player.faction = null;
    await this.document.save();
  }

  // Команды
  @cmd("adminInvite", "Пригласить себя во фракцию")
  public static cmdAdminInvite(
    player: PlayerMp,
    _: string,
    factionName: string
  ) {
    const faction = this.list.find((x) => x.name === factionName);
    if (!faction) {
      player.outputChatBox("Фракции с таким названием не существует");
      return;
    }

    faction.invite(player);
    player.outputChatBox("Вы были добавлены во фракцию " + faction.name);
  }

  @cmd("invite", "Пригласить игрока во фракцию")
  public static cmdInvite(player: PlayerMp, _: string, id: string) {
    const targetPlayer = mp.players.at(+id);

    if (!player.faction) {
      player.outputChatBox("Вы не состоите во фракции");
      return;
    }

    if (!targetPlayer) {
      player.outputChatBox("Такого игрока нет в сети");
      return;
    }

    if (targetPlayer.inviteToFaction) {
      player.outputChatBox("Игрок уже имеет активное приглашение во фракцию");
    } else {
      targetPlayer.inviteToFaction = player.faction;
    }
  }

  @cmd("kick", "Выгнать игрока из фракции")
  public static cmdKick(player: PlayerMp, _: string, id: string) {
    const targetPlayer = mp.players.at(+id);
    const faction = player.faction;

    if (targetPlayer && targetPlayer.faction === faction && faction) {
      faction.kick(targetPlayer);
      player.outputChatBox("Вы кикнули игрока из фракции");
      return;
    } else {
      player.outputChatBox(
        "Игрока с таким ID нет в сети, либо у Вас нет прав кикнуть его"
      );
      return;
    }
  }

  @cmd("accept", "Принять приглашение во фракцию")
  public static cmdAccept(player: PlayerMp) {
    if (player.faction) {
      player.outputChatBox("Вы состоите во фракции");
      return;
    }

    if (!player.inviteToFaction) {
      player.outputChatBox("У Вас нет активных приглашений во фракцию");
      return;
    }

    player.outputChatBox(
      "Вы вступили во фракцию " + player.inviteToFaction.name
    );

    player.inviteToFaction.invite(player);
  }

  @cmd("deciline", "Отклонить приглашение во фракцию")
  public static cmdDeciline(player: PlayerMp) {
    if (player.inviteToFaction) {
      player.inviteToFaction = null;
      player.outputChatBox("Вы отклонили приглашение во фракцию");
    } else {
      player.outputChatBox("У Вас нет активных приглашений во фракцию");
    }
  }
}

// Создание экземпляра класса фракции LSPD
new Faction("LSPD", new mp.Vector3(0, 0, 0));
