import { Compiler, } from 'webpack'
import { defaultFileName, pluginName } from './utils';

interface UpdateEtagOptions {
  name?: string;
  ignoreMode?: boolean;
}

class UpdateEtag {
  options?: UpdateEtagOptions;

  // 需要传入自定义插件构造函数的任意选项
  //（这是自定义插件的公开API）
  constructor(options: UpdateEtagOptions = {}) {
    // 在应用默认选项前，先应用用户指定选项
    // 合并后的选项暴露给插件方法
    // 记得在这里校验所有选项
    this.options = Object.assign({}, this.options, options)
  }

  apply(compiler: Compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;

    compiler.hooks.emit.tapPromise(pluginName, (
      compilation
    ) => {
      return new Promise(async (resolve, reject) => {
        try {
          const options = Object.assign({}, this.options)
          const fileName = `${options.name || defaultFileName}.json`
          const timer = new Date().getTime().toString();
          const random_id = Math.random().toString().slice(-5);
          const fileContent = JSON.stringify({
            data: {
              latest_release_at: `${timer}_${random_id}`,
            },
          });

          compilation.emitAsset(fileName, new RawSource(fileContent))

          resolve()
        } catch (err) {
          return reject(err)
        }
      })
    })
  }
}

export default UpdateEtag;