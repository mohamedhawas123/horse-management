export interface Gender {
  id: number;
  name_ar: string;
  name_en: string;
}

export interface Place {
  id: number;
  number: string;
  category: {
    id: number;
    name: string;
    is_deletable: number;
    parent: any;
  };
}

export interface Horse {
  id: number;
  name: string;
  horse_number: string;
  mother_name: string;
  father_name: string;
  breed: string;
  date_of_birth: string;
  gender: Gender;
  image: string;
  paternity_certificate: string;
  training_horse: number;
  user: any;
  place: Place;
}

export interface HorsesPaginationData {
  data: Horse[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
}

export interface HorsesResponse {
  status: boolean;
  msg: string;
  data: HorsesPaginationData;
}

export interface HorsesDetailsResponse {
  status: boolean;
  msg: string;
  horse: Horse;
}
