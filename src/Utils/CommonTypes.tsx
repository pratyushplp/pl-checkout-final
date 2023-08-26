export type objectProp =
{
  label:string|number
  value:string
}

export type AskResponse = {
    answer: string;
    thoughts: string | null;
    data_points: string[];
    error?: string | undefined;
}