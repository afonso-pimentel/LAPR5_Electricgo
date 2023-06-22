
export class TextUtil {
  public static isUUID (text: string): boolean {
    //guid regex
    const uuidRegex = new RegExp(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$');
    return new RegExp(uuidRegex).test(text)
  }
}