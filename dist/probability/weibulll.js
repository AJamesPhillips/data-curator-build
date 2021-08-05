export function factory_scaled_weibull(args) {
  const {lambda, k, scale} = args;
  return (x) => k / lambda * (x / lambda) ** (k - 1) * Math.exp(-((x / lambda) ** k)) * scale;
}
