export class S3Object {
  eTag: string;
  key: string;
  lastModified: Date;
  owner: { displayName:string , id:string};
  size: number;
  storageClass: string;
}
