import{j as r}from"./index-DdGDdqSk.js";import"./index-DuWnDHUk.js";import"./svelte/svelte.js";const e="passPixelShader",t=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,input.vUV);}`;r.ShadersStoreWGSL[e]||(r.ShadersStoreWGSL[e]=t);const m={name:e,shader:t};export{m as passPixelShaderWGSL};
//# sourceMappingURL=pass.fragment-CaXBDJCo.js.map
