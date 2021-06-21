import { IsDefined, IsUUID } from 'class-validator';

export class UpdatePartnerDto {
  @IsUUID(4)
  @IsDefined()
  partner: string;
}
