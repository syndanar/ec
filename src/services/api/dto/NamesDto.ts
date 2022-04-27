export interface NamesDto {
  [groupId: string]: {
    G: string,
    B: {
      [itemId: string]: {
        N: string,
        T: number
      }
    },
  }

}
