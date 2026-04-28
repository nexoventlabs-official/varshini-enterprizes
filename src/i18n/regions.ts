import type { Locale } from './translations';

export interface RegionConfig {
  stateLabel: string;
  postalLabel: string;
  postalPlaceholder: string;
  addressPlaceholder1: string;
  addressPlaceholder2: string;
  landmarkPlaceholder: string;
  states: string[];
}

const regionData: Record<Locale, RegionConfig> = {
  'en-IN': {
    stateLabel: 'State',
    postalLabel: 'Pincode',
    postalPlaceholder: 'e.g. 600028',
    addressPlaceholder1: 'House/Flat No., Building Name',
    addressPlaceholder2: 'Street, Area, Locality',
    landmarkPlaceholder: 'Near famous landmark',
    states: [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
      'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
      'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
      'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
      'Uttarakhand', 'West Bengal',
    ],
  },
  'en-US': {
    stateLabel: 'State',
    postalLabel: 'ZIP Code',
    postalPlaceholder: 'e.g. 10001',
    addressPlaceholder1: 'Apartment, Suite, Unit, Building',
    addressPlaceholder2: 'Street Address',
    landmarkPlaceholder: 'Cross streets or nearby landmark',
    states: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
      'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia',
    ],
  },
  'de-EU': {
    stateLabel: 'Bundesland',
    postalLabel: 'Postleitzahl',
    postalPlaceholder: 'z.B. 10115',
    addressPlaceholder1: 'Wohnung, Gebäude, Stockwerk',
    addressPlaceholder2: 'Straße und Hausnummer',
    landmarkPlaceholder: 'In der Nähe von',
    states: [
      'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen',
      'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen',
      'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen',
      'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen',
    ],
  },
};

export const getRegionConfig = (locale: Locale): RegionConfig => {
  return regionData[locale];
};

export default regionData;
