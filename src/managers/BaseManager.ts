import { Client } from "../models/client.ts";
import { Collection } from "../utils/collection.ts";

export class BaseManager<T, T2> {
  client: Client
  cacheName: string
  DataType: any

  constructor (client: Client, cacheName: string, DataType: any) {
    this.client = client
    this.cacheName = cacheName
    this.DataType = DataType
  }

  async _get (key: string): Promise<T | undefined> {
    return this.client.cache.get(this.cacheName, key)
  }

  async get (key: string): Promise<T2 | undefined> {
    const raw = await this._get(key)
    if (raw === undefined) return
    return new this.DataType(this.client, raw)
  }

  async set (key: string, value: T): Promise<any> {
    return this.client.cache.set(this.cacheName, key, value)
  }

  async delete (key: string): Promise<boolean> {
    return this.client.cache.delete(this.cacheName, key)
  }

  async array(): Promise<void | T2[]> {
    let arr = await (this.client.cache.array(this.cacheName) as T[])
    return arr.map(e => new this.dataType(this.client, e)) as any
  }

  async collection(): Promise<Collection<string, T2>> {
    const arr = await this.array() as void | T2[]
    if(arr === undefined) return new Collection()
    let collection = new Collection()
    for (const elem of arr) {
      // @ts-ignore
      collection.set(elem.id, elem)
    }
    return collection
  }

  flush() {
    return this.client.cache.deleteCache(this.cacheName)
  }
}
