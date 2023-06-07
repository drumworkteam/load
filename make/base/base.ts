import {
  BaseCard,
  SiteObjectWatcherSchemaType,
  SiteObjectWatcherType,
  code,
} from '~'

export { Base }

export type BaseCallbackType = {
  fork: string
  hook: (site: string, fork: unknown) => void
  link: string
  site: string
}

export type BaseEncounterParamsType = {
  hash: string
  load: string
  name: string
  type: string
}

export type BaseFreeType = () => void

class Base {
  tasks: Array<() => void>

  textMap: Record<string, string>

  watchers: Record<number, Array<SiteObjectWatcherType>>

  env: Record<string, unknown>

  observersByModuleThenIdThenName: Record<
    string,
    Record<string, Record<string, unknown>>
  >

  observersByModuleThenNameThenId: Record<
    string,
    Record<string, Record<string, unknown>>
  >

  cardsByPath: Record<string, BaseCard>

  cardsById: Record<number, BaseCard>

  constructor() {
    this.tasks = []
    this.textMap = {}
    this.watchers = {}
    this.env = {}
    this.observersByModuleThenIdThenName = {}
    this.observersByModuleThenNameThenId = {}
    this.cardsByPath = {}
    this.cardsById = {}
  }

  load(call: () => void) {
    call()
  }

  card(key: string | number) {
    if (code.isString(key)) {
      let card: BaseCard | undefined = this.cardsByPath[key]

      if (!card) {
        card = new BaseCard(key)
        this.cardsByPath[key] = card
        this.cardsById[card.id] = card
      }

      return card
    } else {
      const card = this.cardsById[key]
      assertBaseCard(card)
      return card
    }
  }
}

export type BaseHookType = () => BaseFreeType

export type BaseRequestParamsType = {
  fork: string
  hash: string
  hook: (site: string, fork: unknown) => void
  link: string
  name: string
  site: string
  type: string
}

function assertBaseCard(object: unknown): asserts object is BaseCard {
  if (!(object instanceof BaseCard)) {
    code.throwError(
      code.generateObjectNotTypeError(object, ['base-card']),
    )
  }
}
