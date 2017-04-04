/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare namespace jasmine {
  interface Matchers {
    toHaveText(expected: string): void;
  }
}
