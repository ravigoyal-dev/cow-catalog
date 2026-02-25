export interface Cow {
  tag: string;
  sex: 'Male' | 'Female';
  pen: string;
  status: 'Active' | 'In Treatment' | 'Deceased';
  weight?: number;
  lastEventDate: Date;
  events?: { date: Date; description: string }[];
}
