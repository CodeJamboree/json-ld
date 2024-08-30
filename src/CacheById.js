import { prependOrBringToFront } from "./utils/prependOrBringToFront.js";

export class CacheById {
  queue = [];
  byId = new Map();
  limit = 100;

  constructor({ limit = 100, initialState = {} } = {}) {
    this.limit = limit;
    this.byId = new Map(Object.entries(initialState));
    this.queue = Array.from(this.byId.keys());
  }

  list = () => [...this.queue];

  get = id => {
    const { queue, byId } = this;
    if (!byId.has(id)) return;
    prependOrBringToFront(queue, id);
    return byId.get(id);
  }
  set = (id, value) => {
    if (value === undefined) {
      this.delete(id);
      return;
    }
    const { queue, byId, limit } = this;
    prependOrBringToFront(queue, id);
    byId.set(id, value);
    queue.splice(limit).forEach(byId.delete);
  }
  delete = id => {
    const { queue, byId } = this;
    if (!byId.has(id)) return;
    queue.splice(queue.indexOf(id), 1)
      .forEach(byId.delete)
  }
  clear = () => {
    this.byId.clear();
    this.queue.length = 0;
  }
}
