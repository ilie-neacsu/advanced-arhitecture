import { AggregateRoot } from "@nestjs/cqrs";
import { Version } from "./value-objects/version";

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {

  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  private set version(version: Version) {
    this[VERSION] = version;
  }
}
