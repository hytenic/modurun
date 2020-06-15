/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner, Table, getRepository } from 'typeorm';
import { TrackSeed } from '../seed/track.seed';
import { UserSeed } from '../seed/user.seed';
import { RateSeed } from '../seed/rate.seed';
import { UserTrackSeed } from '../seed/usertrack.seed';

export class AddAllTable1591678514442 implements MigrationInterface {
  name = 'AddAllTable1591678514442'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `track` (`id` int NOT NULL AUTO_INCREMENT, `trackTitle` varchar(255) NULL, `origin` varchar(255) NULL, `destination` varchar(255) NULL, `route` longtext NULL, `trackLength` double NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user_track` (`id` int NOT NULL AUTO_INCREMENT, `bookmark` tinyint NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, `trackId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NULL DEFAULT NULL, `username` varchar(255) NULL DEFAULT NULL, `loginCount` int NOT NULL DEFAULT 1, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `rate` (`id` int NOT NULL AUTO_INCREMENT, `rateValue` int NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` int NULL, `trackId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `user_track` ADD CONSTRAINT `FK_0ef9f7bea0ab00b8bb87935dc2a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_track` ADD CONSTRAINT `FK_acdd9f9001b16ff1b37d52c0ba6` FOREIGN KEY (`trackId`) REFERENCES `track`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `rate` ADD CONSTRAINT `FK_7440b44c5acbec8b2ebfc3af7d2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `rate` ADD CONSTRAINT `FK_487e5917a7bb761bf35835068bf` FOREIGN KEY (`trackId`) REFERENCES `track`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    const trackSeed: any = TrackSeed.makeFakeData;
    const userSeed: any = UserSeed;
    const rateSeed: any = RateSeed;
    await getRepository('track').save(trackSeed);
    await getRepository('user').save(userSeed);
    await getRepository('user_track').save(UserTrackSeed);
    await getRepository('rate').save(rateSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `rate` DROP FOREIGN KEY `FK_487e5917a7bb761bf35835068bf`');
    await queryRunner.query('ALTER TABLE `rate` DROP FOREIGN KEY `FK_7440b44c5acbec8b2ebfc3af7d2`');
    await queryRunner.query('ALTER TABLE `user_track` DROP FOREIGN KEY `FK_acdd9f9001b16ff1b37d52c0ba6`');
    await queryRunner.query('ALTER TABLE `user_track` DROP FOREIGN KEY `FK_0ef9f7bea0ab00b8bb87935dc2a`');
    await queryRunner.query('DROP TABLE `rate`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `user_track`');
    await queryRunner.query('DROP TABLE `track`');
  }
}
