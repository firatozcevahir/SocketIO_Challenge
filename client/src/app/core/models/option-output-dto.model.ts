export class OptionOutputDto {
  public userId!: string;
  public option!: any;
  public type!: 'complete' | 'date' | 'rate' | 'map';
}
