# 📝 MyLightWay API - Contratos de Dados

> **Definições detalhadas de todos os contratos de dados, schemas e validações da API**

## 📋 Índice

- [Schemas de Validação](#-schemas-de-validação)
- [Modelos de Dados](#-modelos-de-dados)
- [Relacionamentos](#-relacionamentos)
- [Business Rules](#-business-rules)
- [Database Schema](#-database-schema)

---

## 🔧 Schemas de Validação

### User Registration Schema

```json
{
  "type": "object",
  "required": ["name", "email", "password", "terms_accepted"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100,
      "pattern": "^[a-zA-ZÀ-ÿ\\s]+$"
    },
    "email": {
      "type": "string",
      "format": "email",
      "maxLength": 255
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$"
    },
    "age": {
      "type": "integer",
      "minimum": 13,
      "maximum": 120
    },
    "role": {
      "type": "string",
      "enum": ["parent", "educator", "admin"]
    },
    "children": {
      "type": "array",
      "maxItems": 10,
      "items": {
        "$ref": "#/definitions/ChildProfile"
      }
    },
    "terms_accepted": {
      "type": "boolean",
      "const": true
    },
    "marketing_consent": {
      "type": "boolean"
    }
  }
}
```

### Child Profile Schema

```json
{
  "type": "object",
  "required": ["name", "birth_date"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 50,
      "pattern": "^[a-zA-ZÀ-ÿ\\s]+$"
    },
    "birth_date": {
      "type": "string",
      "format": "date",
      "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
    },
    "gender": {
      "type": "string",
      "enum": ["male", "female", "other", "prefer_not_to_say"]
    },
    "grade_level": {
      "type": "string",
      "enum": [
        "pre_k", "kindergarten", 
        "1st_grade", "2nd_grade", "3rd_grade", 
        "4th_grade", "5th_grade", "6th_grade"
      ]
    },
    "interests": {
      "type": "array",
      "maxItems": 10,
      "items": {
        "type": "string",
        "enum": [
          "stories", "music", "drawing", "games", 
          "animals", "nature", "science", "sports"
        ]
      }
    },
    "learning_preferences": {
      "type": "object",
      "properties": {
        "learning_style": {
          "type": "string",
          "enum": ["visual", "auditory", "kinesthetic", "mixed"]
        },
        "difficulty_preference": {
          "type": "string",
          "enum": ["easy", "progressive", "challenging"]
        },
        "session_duration": {
          "type": "integer",
          "minimum": 5,
          "maximum": 60
        }
      }
    }
  }
}
```

### Lesson Completion Schema

```json
{
  "type": "object",
  "required": ["session_id", "final_score", "total_time_spent"],
  "properties": {
    "session_id": {
      "type": "string",
      "pattern": "^ses_[a-zA-Z0-9]{10,}$"
    },
    "final_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "total_time_spent": {
      "type": "integer",
      "minimum": 1,
      "maximum": 7200
    },
    "quiz_answers": {
      "type": "object",
      "patternProperties": {
        "^q_[a-zA-Z0-9]+$": {
          "oneOf": [
            {"type": "string"},
            {"type": "array", "items": {"type": "string"}}
          ]
        }
      }
    },
    "activity_scores": {
      "type": "object",
      "patternProperties": {
        "^act_[a-zA-Z0-9]+$": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        }
      }
    },
    "feedback": {
      "type": "object",
      "properties": {
        "difficulty": {
          "type": "string",
          "enum": ["too_easy", "appropriate", "too_hard"]
        },
        "enjoyment": {
          "type": "string",
          "enum": ["not_much", "okay", "good", "very_much"]
        },
        "comment": {
          "type": "string",
          "maxLength": 500
        }
      }
    }
  }
}
```

---

## 📊 Modelos de Dados

### User Model

```typescript
interface User {
  // Primary identifiers
  id: string; // Format: usr_[10-12 chars]
  email: string; // Unique, validated email
  
  // Profile information
  name: string; // Display name
  avatar?: string; // CDN URL or base64
  role: UserRole; // Enum: child, parent, educator, admin
  
  // Relationships
  parent_id?: string; // For child accounts
  children_ids?: string[]; // For parent accounts
  
  // Security & Authentication
  email_verified: boolean;
  phone_verified: boolean;
  two_factor_enabled: boolean;
  
  // Preferences & Settings
  preferences: UserPreferences;
  privacy_settings: PrivacySettings;
  
  // Metadata
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
  last_active_at?: Date;
  
  // Status
  status: 'active' | 'suspended' | 'pending_verification';
  subscription_tier: 'free' | 'pro' | 'family' | 'educator';
}

interface UserPreferences {
  // UI Preferences
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR' | 'en-US' | 'es-ES';
  timezone: string; // IANA timezone
  
  // Learning Preferences
  content_difficulty: 'auto' | 'easy' | 'medium' | 'hard';
  auto_progression: boolean;
  reminder_frequency: 'none' | 'daily' | 'weekly';
  
  // Notification Preferences
  notifications: {
    email: NotificationSettings;
    push: NotificationSettings;
    in_app: NotificationSettings;
  };
  
  // Accessibility
  font_size: 'small' | 'medium' | 'large' | 'extra_large';
  high_contrast: boolean;
  screen_reader: boolean;
  reduced_motion: boolean;
}

interface NotificationSettings {
  enabled: boolean;
  achievements: boolean;
  progress_updates: boolean;
  reminders: boolean;
  community: boolean;
  marketing: boolean;
}
```

### Learning Path Model

```typescript
interface LearningPath {
  // Primary identifiers
  id: string; // Format: lp_[6-8 chars]
  title: string;
  slug: string; // URL-friendly identifier
  
  // Content information
  description: string;
  detailed_description?: string;
  cover_image: string; // CDN URL
  preview_video?: string; // CDN URL
  
  // Classification
  category_id: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  age_groups: AgeGroup[];
  tags: string[];
  
  // Structure
  lessons: LessonReference[];
  estimated_duration: number; // Total minutes
  lessons_count: number; // Computed field
  
  // Learning objectives
  learning_objectives: string[];
  prerequisites: string[]; // Other path IDs
  skills_developed: Skill[];
  
  // Content metadata
  author_id: string;
  collaborators: string[]; // User IDs
  content_version: string; // Semantic versioning
  
  // Publishing & Visibility
  is_published: boolean;
  is_featured: boolean;
  publication_date?: Date;
  access_level: 'free' | 'pro' | 'premium';
  
  // Engagement metrics
  stats: {
    enrolled_count: number;
    completed_count: number;
    average_rating: number;
    total_reviews: number;
    completion_rate: number;
  };
  
  // Metadata
  created_at: Date;
  updated_at: Date;
  last_modified_by: string;
}

interface LessonReference {
  lesson_id: string;
  order: number;
  is_required: boolean;
  unlock_conditions?: UnlockCondition[];
}

interface UnlockCondition {
  type: 'lesson_completion' | 'score_threshold' | 'time_spent' | 'achievement';
  target: string; // ID or value
  threshold?: number;
}
```

### Lesson Model

```typescript
interface Lesson {
  // Primary identifiers
  id: string; // Format: lsn_[6-8 chars]
  path_id: string;
  title: string;
  
  // Content
  description: string;
  content: LessonContent;
  type: LessonType;
  
  // Structure
  order: number; // Within the path
  duration: number; // Estimated minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Learning design
  objectives: string[];
  prerequisites: string[]; // Lesson IDs
  
  // Content organization
  activities: Activity[];
  quiz?: Quiz;
  resources: Resource[];
  
  // Publishing
  is_published: boolean;
  is_required: boolean; // Within the path
  
  // Metadata
  created_at: Date;
  updated_at: Date;
  author_id: string;
  content_version: string;
}

interface LessonContent {
  // Story content
  story?: {
    text: string;
    narration_audio?: string;
    background_music?: string;
    illustrations: Illustration[];
    interactive_elements?: InteractiveElement[];
  };
  
  // Video content
  video?: {
    url: string;
    subtitles?: Subtitle[];
    chapters?: VideoChapter[];
    interactive_markers?: InteractiveMarker[];
  };
  
  // Audio content
  audio?: {
    url: string;
    transcript?: string;
    chapters?: AudioChapter[];
  };
}

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  instructions: string;
  
  // Configuration
  config: ActivityConfig;
  points: number;
  time_limit?: number; // seconds
  
  // Validation
  validation_rules: ValidationRule[];
  hint_system?: HintSystem;
}

type ActivityType = 
  | 'memory_game' 
  | 'matching' 
  | 'sorting' 
  | 'drawing' 
  | 'puzzle'
  | 'word_search'
  | 'drag_drop'
  | 'coloring';

interface ActivityConfig {
  [key: string]: any; // Type-specific configuration
}
```

### Progress Tracking Model

```typescript
interface UserProgress {
  // Identifiers
  id: string;
  user_id: string;
  path_id?: string;
  lesson_id?: string;
  
  // Status
  status: ProgressStatus;
  progress_percentage: number; // 0-100
  
  // Performance metrics
  score?: number; // 0-100
  attempts: ProgressAttempt[];
  time_spent: number; // Total minutes
  
  // Timestamps
  started_at: Date;
  last_activity_at: Date;
  completed_at?: Date;
  
  // Learning analytics
  engagement_metrics: EngagementMetrics;
  learning_insights: LearningInsight[];
}

interface ProgressAttempt {
  id: string;
  attempt_number: number;
  started_at: Date;
  completed_at?: Date;
  score?: number;
  time_spent: number;
  
  // Detailed tracking
  activity_scores: Record<string, number>;
  quiz_responses: QuizResponse[];
  interaction_log: InteractionEvent[];
}

interface EngagementMetrics {
  session_duration: number;
  interaction_count: number;
  pause_frequency: number;
  help_requests: number;
  replay_count: number;
  completion_speed: 'slow' | 'normal' | 'fast';
}

interface LearningInsight {
  type: 'strength' | 'challenge' | 'preference' | 'recommendation';
  category: string;
  description: string;
  confidence_score: number; // 0-1
  generated_at: Date;
}
```

### Achievement System Model

```typescript
interface Achievement {
  // Primary identifiers
  id: string; // Format: ach_[descriptive_name]
  title: string;
  description: string;
  
  // Visual representation
  icon: string; // Unicode emoji or icon code
  badge_image?: string; // CDN URL for custom badge
  color: string; // Hex color code
  
  // Classification
  category: AchievementCategory;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  
  // Game mechanics
  points: number; // XP reward
  requirements: AchievementRequirement[];
  
  // Visibility & Discovery
  is_secret: boolean;
  hint?: string; // For secret achievements
  
  // Metadata
  created_at: Date;
  updated_at: Date;
  
  // Statistics
  unlock_rate: number; // Percentage of users who unlocked
  first_unlocked_at?: Date;
  total_unlocks: number;
}

interface AchievementRequirement {
  type: RequirementType;
  target: number;
  timeframe?: string; // e.g., "7d", "1m", "1y"
  conditions?: Record<string, any>;
}

type RequirementType = 
  | 'lessons_completed'
  | 'paths_completed'
  | 'consecutive_days'
  | 'score_threshold'
  | 'time_spent'
  | 'category_mastery'
  | 'social_interaction'
  | 'perfect_scores'
  | 'help_others';

interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  
  // Unlock details
  unlocked_at: Date;
  unlock_context?: UnlockContext;
  
  // Progress tracking (for progressive achievements)
  current_progress?: number;
  milestone_progress?: MilestoneProgress[];
  
  // Social features
  is_showcased: boolean; // Display on profile
  shared_at?: Date;
  reactions?: AchievementReaction[];
}

interface UnlockContext {
  trigger_event: string;
  lesson_id?: string;
  path_id?: string;
  session_id?: string;
  additional_data?: Record<string, any>;
}
```

---

## 🔗 Relacionamentos

### User Relationships

```sql
-- Parent-Child relationship
users(id) --< users(parent_id)

-- User enrollments
users(id) --< user_progress(user_id)
learning_paths(id) --< user_progress(path_id)

-- User achievements
users(id) --< user_achievements(user_id)
achievements(id) --< user_achievements(achievement_id)

-- User-generated content
users(id) --< blog_posts(author_id)
users(id) --< comments(author_id)
```

### Content Relationships

```sql
-- Learning path structure
learning_paths(id) --< lessons(path_id)
categories(id) --< learning_paths(category_id)

-- Lesson content
lessons(id) --< activities(lesson_id)
lessons(id) --< quizzes(lesson_id)
lessons(id) --< resources(lesson_id)

-- Progress tracking
lessons(id) --< user_progress(lesson_id)
users(id) --< user_progress(user_id)
```

### Content Management

```sql
-- Authorship and collaboration
users(id) --< learning_paths(author_id)
users(id) >-< learning_paths(collaborators) -- Many-to-many

-- Content versioning
learning_paths(id) --< path_versions(path_id)
lessons(id) --< lesson_versions(lesson_id)

-- Reviews and ratings
users(id) --< reviews(author_id)
learning_paths(id) --< reviews(path_id)
```

---

## 📋 Business Rules

### User Management Rules

1. **Account Creation**
   - Email must be unique across all users
   - Parent accounts can have up to 10 child profiles
   - Child profiles require parent approval for ages under 13
   - Username generation follows pattern: firstName + random digits

2. **Authentication & Security**
   - Passwords must meet complexity requirements
   - JWT tokens expire after 15 minutes (access) / 30 days (refresh)
   - Failed login attempts lock account for 15 minutes after 5 attempts
   - Two-factor authentication required for educator and admin roles

3. **Child Account Management**
   - Children under 13 cannot create independent accounts
   - Parent must verify child's age and identity
   - Child data collection follows COPPA compliance
   - Parents can disable/enable child accounts at any time

### Learning Progress Rules

1. **Lesson Access Control**
   - Sequential unlocking: next lesson unlocks after completing previous
   - Score threshold: minimum 70% to unlock advanced content
   - Time gates: some content requires minimum engagement time
   - Age restrictions: content filtered by child's birth date

2. **Progress Tracking**
   - Progress auto-saves every 30 seconds during active sessions
   - Session timeout after 30 minutes of inactivity
   - Maximum 3 attempts per quiz (configurable per lesson)
   - Progress can be reset by parents/educators

3. **Achievement System**
   - Achievements unlock immediately upon meeting criteria
   - Secret achievements have hidden requirements
   - Retroactive unlocking for achievements added after user progress
   - Achievement points contribute to user level and unlocks

### Content Management Rules

1. **Content Publishing**
   - All content requires review before publication
   - Age-appropriate content verification mandatory
   - Copyright and licensing verification required
   - Content versioning maintains backward compatibility

2. **Quality Standards**
   - Lessons must have learning objectives defined
   - Interactive elements require accessibility compliance
   - Audio content requires transcript availability
   - All images require alt-text descriptions

### Privacy & Safety Rules

1. **Data Privacy**
   - Personal data minimization principles
   - Automatic data anonymization for analytics
   - Right to data deletion honored within 30 days
   - Cross-border data transfer restrictions

2. **Child Safety**
   - All communications monitored for inappropriate content
   - Automatic blocking of personal information sharing
   - Community features disabled for children under 13
   - Mandatory safety training for all educators

---

## 🗄️ Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id VARCHAR(20) PRIMARY KEY, -- usr_xxxxxxxxxx
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('child', 'parent', 'educator', 'admin') NOT NULL,
    parent_id VARCHAR(20) NULL,
    avatar_url TEXT NULL,
    birth_date DATE NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    preferences JSON NULL,
    privacy_settings JSON NULL,
    status ENUM('active', 'suspended', 'pending_verification') DEFAULT 'pending_verification',
    subscription_tier ENUM('free', 'pro', 'family', 'educator') DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    last_active_at TIMESTAMP NULL,
    
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_parent_id (parent_id),
    INDEX idx_role_status (role, status),
    INDEX idx_created_at (created_at)
);

-- Categories table
CREATE TABLE categories (
    id VARCHAR(20) PRIMARY KEY, -- cat_xxxxxxxxxx
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NULL,
    color VARCHAR(7) NOT NULL, -- Hex color
    icon VARCHAR(10) NOT NULL, -- Unicode emoji
    type ENUM('content', 'blog') NOT NULL,
    parent_id VARCHAR(20) NULL, -- For subcategories
    order_index INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_type_active (type, is_active),
    INDEX idx_parent_order (parent_id, order_index)
);

-- Learning paths table
CREATE TABLE learning_paths (
    id VARCHAR(20) PRIMARY KEY, -- lp_xxxxxxxxxx
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    detailed_description LONGTEXT NULL,
    cover_image_url TEXT NULL,
    preview_video_url TEXT NULL,
    category_id VARCHAR(20) NOT NULL,
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    estimated_duration INTEGER NOT NULL, -- minutes
    lessons_count INTEGER NOT NULL DEFAULT 0,
    learning_objectives JSON NULL, -- Array of strings
    prerequisites JSON NULL, -- Array of path IDs
    skills_developed JSON NULL, -- Array of skill objects
    author_id VARCHAR(20) NOT NULL,
    collaborators JSON NULL, -- Array of user IDs
    content_version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    publication_date TIMESTAMP NULL,
    access_level ENUM('free', 'pro', 'premium') DEFAULT 'free',
    stats JSON NULL, -- Engagement statistics
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_modified_by VARCHAR(20) NOT NULL,
    
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (last_modified_by) REFERENCES users(id),
    INDEX idx_category_published (category_id, is_published),
    INDEX idx_difficulty_featured (difficulty, is_featured),
    INDEX idx_access_level (access_level),
    FULLTEXT KEY idx_search (title, description)
);

-- Lessons table
CREATE TABLE lessons (
    id VARCHAR(20) PRIMARY KEY, -- lsn_xxxxxxxxxx
    path_id VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content LONGTEXT NULL, -- JSON content
    type ENUM('reading', 'video', 'audio', 'interactive', 'quiz', 'activity') NOT NULL,
    order_index INTEGER NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    objectives JSON NULL, -- Array of learning objectives
    prerequisites JSON NULL, -- Array of lesson IDs
    is_published BOOLEAN DEFAULT FALSE,
    is_required BOOLEAN DEFAULT TRUE,
    unlock_conditions JSON NULL,
    author_id VARCHAR(20) NOT NULL,
    content_version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_path_order (path_id, order_index),
    INDEX idx_type_published (type, is_published),
    INDEX idx_difficulty (difficulty)
);

-- User progress table
CREATE TABLE user_progress (
    id VARCHAR(20) PRIMARY KEY, -- prg_xxxxxxxxxx
    user_id VARCHAR(20) NOT NULL,
    path_id VARCHAR(20) NULL,
    lesson_id VARCHAR(20) NULL,
    status ENUM('not_started', 'in_progress', 'completed', 'locked') NOT NULL,
    progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00, -- 0.00-100.00
    score DECIMAL(5,2) NULL, -- 0.00-100.00
    attempts_count INTEGER NOT NULL DEFAULT 0,
    time_spent INTEGER NOT NULL DEFAULT 0, -- minutes
    started_at TIMESTAMP NULL,
    last_activity_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    engagement_metrics JSON NULL,
    learning_insights JSON NULL,
    session_data JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_lesson (user_id, lesson_id),
    UNIQUE KEY unique_user_path (user_id, path_id),
    INDEX idx_user_status (user_id, status),
    INDEX idx_path_progress (path_id, status),
    INDEX idx_last_activity (last_activity_at)
);

-- Achievements table
CREATE TABLE achievements (
    id VARCHAR(50) PRIMARY KEY, -- ach_descriptive_name
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(10) NOT NULL, -- Unicode emoji
    badge_image_url TEXT NULL,
    color VARCHAR(7) NOT NULL, -- Hex color
    category ENUM('completion', 'streak', 'mastery', 'exploration', 'social', 'special') NOT NULL,
    rarity ENUM('common', 'uncommon', 'rare', 'epic', 'legendary') NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    requirements JSON NOT NULL, -- Achievement requirements
    is_secret BOOLEAN DEFAULT FALSE,
    hint TEXT NULL,
    unlock_rate DECIMAL(5,4) DEFAULT 0.0000, -- 0.0000-1.0000
    first_unlocked_at TIMESTAMP NULL,
    total_unlocks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category_rarity (category, rarity),
    INDEX idx_points (points),
    INDEX idx_unlock_rate (unlock_rate)
);

-- User achievements table
CREATE TABLE user_achievements (
    id VARCHAR(20) PRIMARY KEY, -- uach_xxxxxxxxx
    user_id VARCHAR(20) NOT NULL,
    achievement_id VARCHAR(50) NOT NULL,
    unlocked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unlock_context JSON NULL,
    current_progress INTEGER NULL,
    milestone_progress JSON NULL,
    is_showcased BOOLEAN DEFAULT TRUE,
    shared_at TIMESTAMP NULL,
    reactions JSON NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (user_id, achievement_id),
    INDEX idx_user_unlocked (user_id, unlocked_at),
    INDEX idx_achievement_unlocked (achievement_id, unlocked_at)
);
```

### Supporting Tables

```sql
-- Progress attempts (detailed tracking)
CREATE TABLE progress_attempts (
    id VARCHAR(20) PRIMARY KEY, -- att_xxxxxxxxxx
    progress_id VARCHAR(20) NOT NULL,
    attempt_number INTEGER NOT NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    score DECIMAL(5,2) NULL,
    time_spent INTEGER NOT NULL DEFAULT 0, -- seconds
    activity_scores JSON NULL,
    quiz_responses JSON NULL,
    interaction_log LONGTEXT NULL, -- Compressed JSON log
    
    FOREIGN KEY (progress_id) REFERENCES user_progress(id) ON DELETE CASCADE,
    INDEX idx_progress_attempt (progress_id, attempt_number),
    INDEX idx_completed_at (completed_at)
);

-- Age groups table
CREATE TABLE age_groups (
    id VARCHAR(20) PRIMARY KEY, -- ag_xxxxxxxxxx
    name VARCHAR(100) NOT NULL,
    min_age INTEGER NOT NULL,
    max_age INTEGER NOT NULL,
    color VARCHAR(7) NOT NULL,
    description TEXT NULL,
    characteristics JSON NULL,
    recommended_session_duration INTEGER NULL, -- minutes
    learning_focus JSON NULL, -- Array of focus areas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_age_range (min_age, max_age)
);

-- Path age group relationships
CREATE TABLE path_age_groups (
    path_id VARCHAR(20) NOT NULL,
    age_group_id VARCHAR(20) NOT NULL,
    
    PRIMARY KEY (path_id, age_group_id),
    FOREIGN KEY (path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
    FOREIGN KEY (age_group_id) REFERENCES age_groups(id) ON DELETE CASCADE
);

-- Blog posts table
CREATE TABLE blog_posts (
    id VARCHAR(20) PRIMARY KEY, -- post_xxxxxxxxx
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    featured_image_url TEXT NULL,
    author_id VARCHAR(20) NOT NULL,
    category_id VARCHAR(20) NOT NULL,
    tags JSON NULL, -- Array of tag strings
    seo_data JSON NULL, -- Meta title, description, etc.
    stats JSON NULL, -- Views, likes, shares, etc.
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    reading_time INTEGER NULL, -- minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    INDEX idx_published_featured (is_published, is_featured),
    INDEX idx_published_at (published_at),
    INDEX idx_category_published (category_id, is_published),
    FULLTEXT KEY idx_search (title, excerpt, content)
);

-- Comments table
CREATE TABLE comments (
    id VARCHAR(20) PRIMARY KEY, -- cmt_xxxxxxxxxx
    post_id VARCHAR(20) NOT NULL,
    author_id VARCHAR(20) NOT NULL,
    parent_id VARCHAR(20) NULL, -- For nested comments
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT TRUE,
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    INDEX idx_post_approved (post_id, is_approved),
    INDEX idx_parent_created (parent_id, created_at)
);
```

---

<div align="center">

**MyLightWay API Contracts v1.0.0**

Schemas e contratos de dados para desenvolvimento da API

[📚 Voltar à Documentação](API_DOCUMENTATION.md) · [🏠 Projeto Principal](../README.md)

</div>