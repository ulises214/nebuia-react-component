import { Optional } from '../../lib/common/Optional';

export interface Verifications {
  description?: Optional<string>;
  status?: Optional<boolean>;
  note?: Optional<string>;
}

class Zone {
  zipCode?: Optional<string>;
  township?: Optional<string>;
  townshipType?: Optional<string>;
  municipality?: Optional<string>;
  state?: Optional<string>;
  cpId?: Optional<string>;
  stateId?: Optional<string>;
  officeId?: Optional<string>;
  townshipTypeId?: Optional<string>;
  municipalityId?: Optional<string>;
  townshipZipTypeId?: Optional<string>;
  zone?: Optional<string>;
}

class State {
  completeName: Optional<string>;
  abbreviation: Optional<string>;
  renapo: Optional<string>;
  twoDigits: Optional<string>;
  threeDigitsNomenclature: Optional<string>;
  key: Optional<string>;
}

export interface Address {
  address?: Optional<string[]>;
  verifications?: Optional<Verifications[]>;
  zone?: Optional<Zone>;
  state?: Optional<State>;
  exact?: Optional<boolean>;
  valid?: Optional<boolean>;
}
