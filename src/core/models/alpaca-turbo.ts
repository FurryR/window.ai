import { Model, ModelConfig, ModelOptions } from "./model"

export enum AlpacaModelId {
  GGML_7B = "7B/ggml-model-q4_0.bin",
  GGML_30B = "30B/ggml-model-q4_0.bin"
}

export function init(
  config: Pick<ModelConfig, "quality" | "debug"> &
    Partial<Pick<ModelConfig, "cacheGet" | "cacheSet">> = {},
  opts: ModelOptions = {}
): Model {
  const modelId =
    config.quality === "max" ? AlpacaModelId.GGML_30B : AlpacaModelId.GGML_7B
  return new Model(
    {
      modelProvider: "alpaca",
      modelId,
      apiKey: null,
      baseUrl: "http://127.0.0.1:8000",
      generationPath: "/completions",
      streamPath: "/streams",
      debug: config.debug,
      cacheGet: config.cacheGet,
      cacheSet: config.cacheSet,
      transformForRequest: (req) => {
        const { prompt } = req
        return {
          prompt
        }
      },
      transformResponse: (res) => {
        return res["choices"][0]["text"]
      }
    },
    opts
  )
}
