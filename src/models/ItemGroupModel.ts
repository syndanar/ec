export class ItemGroupModel {
  public groupId = 0;

  public groupName = '';

  public constructor(groupId: number, groupName: string) {
    this.groupId = groupId;
    this.groupName = groupName;
  }
}
