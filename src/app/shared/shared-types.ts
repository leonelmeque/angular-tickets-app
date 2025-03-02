export type JsonBinResponseType<K extends string, T> = {
  metadata: {
    id: string;
    private: boolean;
    createAt: string;
  };
  record: Record<K, T>;
};
