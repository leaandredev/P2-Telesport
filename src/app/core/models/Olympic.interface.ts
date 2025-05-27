import { Participation } from './Participation.interface';

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
