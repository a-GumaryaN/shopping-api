import { Base_repository } from '.';
import { Comment, Customer } from 'src/domain/model';

const comment_repository = new Base_repository<Comment>("comment");

export default comment_repository;
