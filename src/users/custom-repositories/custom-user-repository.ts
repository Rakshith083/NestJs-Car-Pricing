import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../users.entity';

@EntityRepository(Users)
export class CustomUserRepository extends Repository<Users> {
  async insertSoftDeletedUser(user: Users): Promise<void> {
    const query = this.createQueryBuilder('user')
      .insert()
      .values(user)
      .onConflict(
        `(SELECT id FROM user WHERE email = ${user.email} AND deletedAt IS NOT NULL) DO UPDATE SET deletedAt = NULL`
      );

    await query.execute();
  }
}