export interface ProducerInterval {
  min: IntervalDetails[];
  max: IntervalDetails[];
}
  
export interface IntervalDetails {
  producer: string;
  interval: number;
  previousYear: number;
  followingYear: number;
}