import { getCookie, setCookie } from "typescript-cookie";

export class CookieHelper {
  public static getCookie(name: string): string | undefined {
    return getCookie(name);
  }

  public static setCookie(name: string, value: string): void {
    setCookie(name, value);
  }

  public static toggleCookie(name: string): void {
    if (this.getCookie(name) === "false") {
      this.setCookie(name, "true");
    } else {
      this.setCookie(name, "false");
    }
  }

  public static toggleCookieAndReload(name: string): void {
    if (this.getCookie(name) === "false") {
      this.setCookie(name, "true");
    } else {
      this.setCookie(name, "false");
    }
    location.reload();
  }
}
