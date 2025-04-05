/**
 * Utility functions for localStorage key management
 */

/**
 * Generate a key for storing post read status
 * @param slug The post slug
 * @returns The localStorage key for post read status
 */
export function getPostReadKey(slug: string): string {
  return `post-${slug}-read`;
}

/**
 * Generate a key for storing checklist state
 * @param slug The post slug
 * @returns The localStorage key for checklist state
 */
export function getChecklistKey(slug: string): string {
  return `checklist_${slug}`;
}

/**
 * Generate a key for storing checklist visibility state
 * @param slug The post slug
 * @returns The localStorage key for checklist visibility
 */
export function getChecklistVisibilityKey(slug: string): string {
  return `checklist_visible_${slug}`;
}

/**
 * Get the saved state for a checklist
 * @param slug The post slug
 * @returns The saved checklist state or an empty object if none exists
 */
export function getChecklistState(slug: string): Record<string, boolean> {
  const savedState = localStorage.getItem(getChecklistKey(slug));
  return savedState ? JSON.parse(savedState) : {};
}

/**
 * Save the state for a checklist
 * @param slug The post slug
 * @param state The checklist state to save
 */
export function saveChecklistState(slug: string, state: Record<string, boolean>): void {
  localStorage.setItem(getChecklistKey(slug), JSON.stringify(state));
}

/**
 * Get the read status for a post
 * @param slug The post slug
 * @returns Whether the post is marked as read
 */
export function isPostRead(slug: string): boolean {
  return localStorage.getItem(getPostReadKey(slug)) === 'true';
}

/**
 * Set the read status for a post
 * @param slug The post slug
 * @param isRead Whether the post is marked as read
 */
export function setPostRead(slug: string, isRead: boolean): void {
  localStorage.setItem(getPostReadKey(slug), isRead.toString());
}

/**
 * Get the visibility state for a checklist
 * @param slug The post slug
 * @returns Whether the checklist is visible
 */
export function isChecklistVisible(slug: string): boolean {
  return localStorage.getItem(getChecklistVisibilityKey(slug)) !== 'false';
}

/**
 * Set the visibility state for a checklist
 * @param slug The post slug
 * @param isVisible Whether the checklist is visible
 */
export function setChecklistVisible(slug: string, isVisible: boolean): void {
  localStorage.setItem(getChecklistVisibilityKey(slug), isVisible.toString());
} 