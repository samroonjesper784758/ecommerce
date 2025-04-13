export interface createAddressDto {
  lineOne: string;
  lineTwo?: string;
  city: string;
  country: string;
  pinCode: string;
}

export interface updateAddressDto {
  lineOne?: string;
  lineTwo?: string;
  city?: string;
  country?: string;
  pinCode?: string;
}
