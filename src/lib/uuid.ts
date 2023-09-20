/**
 * Generate UUID v4
 *
 *  These Ids are used as UserIds
 */
export function genId() {
  return crypto.randomUUID();
}
