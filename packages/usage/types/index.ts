import { ObjectType, Field, ID } from '@nestjs/graphql';

export enum Grands {
  ADMINISTRATOR = 'ADMINISTRATOR',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

export enum NotificationType {
  newPosts = 'newPosts',
  newComments = 'newComments',
  newFollowers = 'newFollowers',
  reply = 'reply',
  heartOnPost = 'heartOnPost',
  heartOnComment = 'heartOnComment',
  heartOnReply = 'heartOnReply',
}

export enum Language {
  Typescript = 'Typescript',
  Javascript = 'Javascript',
  Rust = 'Rust',
  Go = 'Go',
  Python = 'Python',
  Cpp = 'Cpp',
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  email: string | null;

  @Field(() => Grands, { defaultValue: Grands.USER })
  grant: keyof typeof Grands;

  @Field(() => Date)
  createdAt: Date | null;

  @HideField()
  updatedAt: Date | null;

  @Field(() => Profile, { nullable: true })
  Profile?: Profile | null;
}