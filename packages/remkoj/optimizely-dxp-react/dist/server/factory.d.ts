import 'server-only';
import type * as Types from '../types';
export type { ComponentFactory } from '../types';
export { DefaultComponentFactory } from '../factory';
/**
 * Retrieve the working instance of the component factory, which is memoized through the React.cache()
 * server side react method
 */
export declare const getFactory: () => Types.ComponentFactory;
export default getFactory;
