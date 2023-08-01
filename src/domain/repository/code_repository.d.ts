import base_repository from './base_repository';
import Code from '../model/Code';
type Code_parameters = keyof Code;
type selectable_model_value = Partial<Record<Code_parameters, boolean>>;
interface code_repository extends base_repository<Code> {}

export default code_repository;
