export class dataStorage {
  constructor() {
    this.key = "animeSeasonApp";
  }

  save(item) {
    let myitem = this.get(item.id)
    if (myitem)
      this.update(item)
    else
      this.create(item)
  }

  create(item) {
    let items = this.getAll();
    items.push(item);
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  getAll() {
    let items = localStorage.getItem(this.key);
    return items ? JSON.parse(items) : [];
  }

  update(item) {
    let items = this.getAll();
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == item.id) {
        items[i] = item;
        break;
      }
    }
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  delete(id) {
    let items = this.getAll();
    items = items.filter(item => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  get(id) {
    let items = this.getAll();
    return items.find(item => item.id == id);
  }
}