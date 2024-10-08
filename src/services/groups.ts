import { SharedState } from "../types/data.js";
import { Group, Groups } from "../types/groups.js";

import { log } from "./log.js";

export function removeOldGroup(groups: Groups, id: string) {
  if (groups.has(id)) {
    const group = groups.get(id) as Group;
    const date = new Date();
    if (date.getTime() - group.updated.getTime() > 1000 * 60 * 60 * 24 * 3) {
      groups.delete(id);
    }
  }
}

export function removeOldGroups(groups: Groups) {
  for (const id of groups.keys()) {
    removeOldGroup(groups, id);
  }
}

export function initGroup(groups: Groups, id: string, state?: SharedState) {
  const date = new Date();

    const group = {
      created: date,
      users: {},
      state:state,
      updated: date,
    };  
    groups.set(id, group);
    log(`--- INIT GROUP "${id}" ---`);
    log(group);  
}

export function updateGroup(groups: Groups, id: string, group: Group) {
  group.updated = new Date();
  groups.set(id, group);
  log(`--- GROUP "${id}" DATA ---`);
  log(group);
}
