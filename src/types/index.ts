export type SectionId = 
  | 'hero'
  | 'about'
  | 'divisions'
  | 'business-model'
  | 'racing'
  | 'technology'
  | 'power'
  | 'academy'
  | 'ambition'
  | 'revenue'
  | 'partners'
  | 'founder'
  | 'contact';

export interface DivisionItem {
  id: string;
  name: string;
  tagline: string;
  focus: string[];
  description: string;
  targetHorizon: string;
  keyPillars: { title: string; detail: string }[];
}

export interface BusinessStage {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  description: string;
  input: string;
  output: string;
}

export interface TechnicalModule {
  id: string;
  title: string;
  category: string;
  summary: string;
  methodology: string;
  keyDisciplines: string[];
  metricsContext: string;
}

export interface RevenueStream {
  id: string;
  title: string;
  category: string;
  description: string;
  timeline: string;
  governance: string;
}

export interface EnquiryFormState {
  name: string;
  company: string;
  position: string;
  email: string;
  country: string;
  enquiryType: string;
  message: string;
}
