export const STAGE_TROPOSPHERE = 'troposphere'; // like localhost
export const STAGE_STRATOSPHERE = 'stratosphere'; // like staging or test
export const STAGE_MESOSPHERE = 'mesosphere'; // like production
export const STAGE = process.env.STAGE || STAGE_TROPOSPHERE;

export const URI_DEFAULT = '/';
export const URI_INNER = '/inner/';
