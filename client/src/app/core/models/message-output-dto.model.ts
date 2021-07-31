export class MessageOutputDto {
  public userId!: string;
  public author!: string;
  public message!: string;
  public command!: CommandModel | null;
}

export class CommandModel {
  public type!: string;
  public data: any;
}
