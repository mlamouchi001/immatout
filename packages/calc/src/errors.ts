export class CalcError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'CalcError';
  }
}

export class NotImplementedError extends CalcError {
  constructor(feature: string) {
    super(`Not implemented yet: ${feature}`, 'NOT_IMPLEMENTED');
    this.name = 'NotImplementedError';
  }
}

export class MissingScaleError extends CalcError {
  constructor(scale: string, year: number) {
    super(`Missing reference scale "${scale}" for year ${year}`, 'MISSING_SCALE');
    this.name = 'MissingScaleError';
  }
}
