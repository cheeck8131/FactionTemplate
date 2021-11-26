import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

// Схема для базы данных MongoDB;
export class FactionSchema {
  @prop() public name: string; // Название фракции;
  @prop({ type: [String] }) public players: string[]; // rgscId игроков состоящих во фракции;

  constructor(name: string) {
    this.name = name;
    this.players = [];
  }
}

// Модель фракции;
export const FactionModel = getModelForClass(FactionSchema);

(async () => {
  console.log("connect to db...");
  console.log(mongoose.connect);
  mp.events.delayInitialization = true; // Задержать инициализацию сервера
  await mongoose.connect("mongodb://localhost:27017/", { dbName: "test" });
})();
