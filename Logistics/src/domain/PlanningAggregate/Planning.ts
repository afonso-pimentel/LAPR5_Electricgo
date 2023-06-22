import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';

interface PlanningProps {
  id: UniqueEntityID;
}

export class Planning extends AggregateRoot<PlanningProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(props: PlanningProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Creates a new path with the given properties and returns a Result<Path> object with the path or an error message
   * @param props
   * @param id
   * @returns
   */
  public static create(props: PlanningProps, id?: UniqueEntityID): Result<Planning> {
    return Result.ok<Planning>();
  }
}
