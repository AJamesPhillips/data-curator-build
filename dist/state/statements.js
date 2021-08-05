import {get_new_created_ats} from "../shared/utils/datetime.js";
import {get_new_statement_id} from "../shared/utils/ids.js";
export const statements_reducer = (state, action) => {
  if (is_add_statement(action)) {
    const new_statement = {
      id: action.id,
      content: action.content,
      datetime_created: action.datetime_created,
      labels: action.labels
    };
    state = {
      ...state,
      statements: [...state.statements, new_statement]
    };
  }
  if (is_delete_statement(action)) {
    state = {
      ...state,
      statements: state.statements.filter(({id}) => id !== action.id)
    };
  }
  if (is_replace_all_statements(action)) {
    state = {
      ...state,
      statements: action.statements
    };
  }
  return state;
};
const add_statement_type = "add_statement";
const add_statement = (args, creation_context) => {
  const {created_at: datetime_created} = get_new_created_ats(creation_context);
  const id = get_new_statement_id();
  return {
    type: add_statement_type,
    id,
    datetime_created,
    content: args.content,
    labels: args.labels
  };
};
const is_add_statement = (action) => {
  return action.type === add_statement_type;
};
const delete_statement_type = "delete_statement";
const delete_statement = (id) => {
  return {type: delete_statement_type, id};
};
const is_delete_statement = (action) => {
  return action.type === delete_statement_type;
};
const replace_all_statements_type = "replace_all_statements";
const replace_all_statements = (args) => {
  return {
    type: replace_all_statements_type,
    statements: args.statements
  };
};
const is_replace_all_statements = (action) => {
  return action.type === replace_all_statements_type;
};
export const statement_actions = {
  add_statement,
  delete_statement,
  replace_all_statements
};
