// Декораторы для эвентов и команд Rage Multiplayer;

export const cmd = (cmdName?: string, description?: string) => {
  // cmdName - название команды, description можно использовать для подсказок в чате;
  return (target: any, propertyKey: string) => {
    mp.events.addCommand(
      cmdName ?? propertyKey,
      Reflect.get(target, propertyKey)
    );
  };
};

export const event = (name: RageEnums.EventKey) => {
  return (target: any, propertyKey: string) => {
    mp.events.add(name ?? propertyKey, Reflect.get(target, propertyKey));
  };
};
