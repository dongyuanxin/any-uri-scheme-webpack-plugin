class AnyUriSchemePlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    const logger = compiler.getInfrastructureLogger('AnyUriSchemePlugin');
    logger.info('[AnyUriSchemePlugin] init');

    compiler.hooks.compilation.tap(
      'AnyUriSchemePlugin',
      (_, { normalModuleFactory }) => {
        if (!(Array.isArray(this.options.schemes) && this.options.schemes.length > 0)) {
          return;
        }

        this.options.schemes.forEach((scheme) => {
          normalModuleFactory.hooks.beforeResolve.tap(
            'AnyUriSchemePlugin',
            (resolveData) => {
              if (!resolveData) return;
              if (resolveData.request.startsWith(scheme) && typeof this.options.handler === 'function') {
                const lastReqeust = resolveData.request;
                const handleRet = this.options.handler(scheme, resolveData);
                if (handleRet) {
                  resolveData = handleRet;
                }
                if (this.options.log?.open) {
                  if (this.options.log.timeout && this.options.log.timeout > 0) {
                    setTimeout(() => {
                      logger.log(`[AnyUriSchemePlugin] ${lastReqeust} ---> ${resolveData.request}`);
                    }, this.options.log.timeout);
                  } else {
                    logger.log(`[AnyUriSchemePlugin] ${lastReqeust} ---> ${resolveData.request}`);
                  }
                }
              }
            }
          );
        });
      }
    );
  }
}

module.exports = AnyUriSchemePlugin;