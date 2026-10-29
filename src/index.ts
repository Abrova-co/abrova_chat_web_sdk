// Main client
export { AbrovaChatClient } from './AbrovaChatClient';

// Configuration
export { AbrovaChatConfig, normalizeConfig } from './AbrovaChatConfig';

// Models
export type {
  Attachment,
  ConnectionState,
  Message,
  MessageType,
  PaginatedMessages,
  Participant,
  ParticipantRole,
  Reaction,
  Room,
  RoomType,
  RoomUnread,
  SubscriptionStatus,
  UnreadSummary,
} from './models/types';

// Events
export type {
  AbrovaChatEventMap,
  ConnectionStateEvent,
  MessageDeletionEvent,
  MessageEditEvent,
  MessageEvent,
  MessagePinEvent,
  PresenceEvent,
  ReactionEvent,
  ReadReceiptEvent,
  RecoveryFailedEvent,
  RoomUpdatedEvent,
  SubscriptionStateEvent,
  TypingEvent,
  AuthErrorEvent,
  MessageSentEvent,
  MessageFailedEvent,
} from './events/events';

// Offline outbox
export type { OutboxStore, PendingMessage } from './services/Outbox';

// Errors & Types
export { AbrovaChatError } from './services/ApiService';
export type { TokenProvider } from './services/TokenManager';
export type { Mention, SearchResult, UploadResult } from './services/ApiService';

// SDK identity
export { SDK_NAME, SDK_VERSION } from './version';
