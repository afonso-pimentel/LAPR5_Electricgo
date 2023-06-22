export interface IGuardResult {
  succeeded: boolean;
  message?: string;
}

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  /**
   * Check if any of the GuardResults are false and return the first one that is false
   * @param guardResults
   * @returns
   */
  public static combine(guardResults: IGuardResult[]): IGuardResult {
    for (let result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return { succeeded: true };
  }

  /**
   * Bulk version of againstNullOrUndefined
   * @param args
   * @returns
   */
  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  /**
   * Check if argument is null or undefined for example: againstNullOrUndefined('red', 'color') => true or againstNullOrUndefined(null, 'color') => false
   * @param argument
   * @param argumentName
   * @returns
   */
  public static againstNullOrUndefined(argument: any, argumentName: string): IGuardResult {
    if (argument === null || argument === undefined) {
      return { succeeded: false, message: `${argumentName} is null or undefined` };
    } else {
      return { succeeded: true };
    }
  }

  /**
   * used to check if a value equal to ones in validValues for example: isOneOf('red', ['red', 'blue', 'green']) => true
   * @param value
   * @param validValues
   * @param argumentName
   * @returns
   */
  public static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return { succeeded: true };
    } else {
      return {
        succeeded: false,
        message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`,
      };
    }
  }

  // bulk version of isOFType
  public static isOfTypeBulk(args: GuardArgumentCollection, type: string): IGuardResult {
    for (let arg of args) {
      const result = this.isOfType(arg.argument, type, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  /**
   * check type of argument for example: isOfType('red', 'string', 'color') => true
   * accepts: string, number, boolean, object, function, undefined
   * @param value
   * @param type
   * @param argumentName
   * @returns
   */
  public static isOfType(value: any, type: string, argumentName: string): IGuardResult {
    if (typeof value !== type) {
      return {
        succeeded: false,
        message: `${argumentName} isn't of type ${type}. Got "${typeof value}".`,
      };
    } else {
      return { succeeded: true };
    }
  }

  /**
   * Bulk version of inRange
   * @param args
   * @param min
   * @param max
   * @returns IGuardResult
   */
  public static InRangeBulk(args: GuardArgumentCollection, min: number, max: number): IGuardResult {
    for (let arg of args) {
      const result = this.inRange(arg.argument, min, max, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  /**
   * Check if number is in range for example: inRange(5, 1, 10, 'number') => true
   * @param num
   * @param min
   * @param max
   * @param argumentName
   * @returns
   */
  public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.` };
    } else {
      return { succeeded: true };
    }
  }

  /**
   * Check if array of numbers are in range for example: numbersAreInRange([1, 2, 3], 1, 10, 'numbers') => true
   * @param numbers
   * @param min
   * @param max
   * @param argumentName
   * @returns
   */
  public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult {
    let failingResult: IGuardResult = null;
    for (let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return { succeeded: false, message: `${argumentName} is not within the range.` };
    } else {
      return { succeeded: true };
    }
  }

  /**
   * Bulk version of stringLengthInRange
   * @param args
   * @param min
   * @param max
   * @returns
   */
  public static stringLengthInRangeBulk(args: GuardArgumentCollection, min: number, max: number): IGuardResult {
    for (let arg of args) {
      const result = this.stringLengthInRange(arg.argument, min, max, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  /**
   * check if string length is in range for example: stringLengthInRange('red', 1, 5, 'color') => true
   * use stringLengthInRangeBulk("four", 4, 4, "four") to check a precise length of 4
   * @param str
   * @param min
   * @param max
   * @param argumentName
   * @returns
   */
  public static stringLengthInRange(str: string, min: number, max: number, argumentName: string): IGuardResult {
    const isInRange = str.length >= min && str.length <= max;
    if (!isInRange) {
      return { succeeded: false, message: `${argumentName} is not within range ${min} to ${max}.` };
    } else {
      return { succeeded: true };
    }
  }

   /**
   * Bulk version of againstPositiveNumber.
   * @param args The list of arguments.
   * @returns The guard result.
   */
    public static againstPositiveNumberBulk(args: GuardArgumentCollection): IGuardResult {
      for (let arg of args) {
        const result = this.againstPositiveNumber(arg.argument, arg.argumentName);
        if (!result.succeeded) return result;
      }
  
      return { succeeded: true };
    }

  /**
   * Checks if a given number is a positive number.
   * @param argument The input number.
   * @param argumentName The argument name.
   * @returns Guard result.
   */
  public static againstPositiveNumber(argument: number, argumentName: string) : IGuardResult {
    if (argument > 0) {
      return { succeeded: true };
    }

    return { succeeded: false, message: `${argumentName} must be a positive number.` };
  }

  public static isGuid(str: string, argumentName: string) : IGuardResult{
    const regularExpression: RegExp =  new RegExp("^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$");
    const valid: Boolean = regularExpression.test(str); 
    if(!valid){
    return { succeeded: false, message: `${argumentName} is not a valid GUID.` };
    }
    return { succeeded: true};
  }
}
