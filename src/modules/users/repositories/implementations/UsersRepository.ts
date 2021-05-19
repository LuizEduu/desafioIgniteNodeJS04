import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(user_id: string): User | undefined {
    const findUser = this.users.find((user: User) => user.id === user_id);

    return findUser;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user: User) => user.email === email);

    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    const indexUser = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    const user = receivedUser;

    user.admin = true;
    user.updated_at = new Date();

    this.users[indexUser] = user;

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
