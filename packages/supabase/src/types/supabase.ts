export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bundle_tests: {
        Row: {
          bundle_id: string
          test_id: string
        }
        Insert: {
          bundle_id: string
          test_id: string
        }
        Update: {
          bundle_id?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bundle_tests_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_tests_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          },
        ]
      }
      bundles: {
        Row: {
          created_at: string | null
          currency: string | null
          deleted: boolean | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      facets: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          facet_id: string | null
          id: string
          test_id: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          facet_id?: string | null
          id?: string
          test_id?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          facet_id?: string | null
          id?: string
          test_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facets_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          },
        ]
      }
      facets_prompts: {
        Row: {
          created_at: string | null
          facet_id: string | null
          id: string
          lang: string | null
          model: string | null
          system_prompt: string | null
          temperature: number | null
          updated_at: string | null
          user_prompt_template: string | null
        }
        Insert: {
          created_at?: string | null
          facet_id?: string | null
          id?: string
          lang?: string | null
          model?: string | null
          system_prompt?: string | null
          temperature?: number | null
          updated_at?: string | null
          user_prompt_template?: string | null
        }
        Update: {
          created_at?: string | null
          facet_id?: string | null
          id?: string
          lang?: string | null
          model?: string | null
          system_prompt?: string | null
          temperature?: number | null
          updated_at?: string | null
          user_prompt_template?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facets_prompts_facet_id_fkey"
            columns: ["facet_id"]
            isOneToOne: false
            referencedRelation: "facets"
            referencedColumns: ["id"]
          },
        ]
      }
      facets_translations: {
        Row: {
          description: string | null
          facet_id: string | null
          id: string
          lang: string | null
          name: string | null
        }
        Insert: {
          description?: string | null
          facet_id?: string | null
          id?: string
          lang?: string | null
          name?: string | null
        }
        Update: {
          description?: string | null
          facet_id?: string | null
          id?: string
          lang?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facets_translations_facet_id_fkey"
            columns: ["facet_id"]
            isOneToOne: false
            referencedRelation: "facets"
            referencedColumns: ["id"]
          },
        ]
      }
      ia_sessions: {
        Row: {
          app_scope: string | null
          emotion_score: number | null
          ended_at: string | null
          facet_id: string | null
          id: string
          important_quotes: string[] | null
          metadata: Json | null
          started_at: string | null
          status: string | null
          summary: string | null
          test_session_id: string | null
          topics: string[] | null
          user_id: string | null
        }
        Insert: {
          app_scope?: string | null
          emotion_score?: number | null
          ended_at?: string | null
          facet_id?: string | null
          id?: string
          important_quotes?: string[] | null
          metadata?: Json | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          test_session_id?: string | null
          topics?: string[] | null
          user_id?: string | null
        }
        Update: {
          app_scope?: string | null
          emotion_score?: number | null
          ended_at?: string | null
          facet_id?: string | null
          id?: string
          important_quotes?: string[] | null
          metadata?: Json | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          test_session_id?: string | null
          topics?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ia_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_mythology: {
        Row: {
          associated_facets: string[] | null
          created_at: string | null
          id: string
          meaning: string | null
          source: string | null
          symbol: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          associated_facets?: string[] | null
          created_at?: string | null
          id?: string
          meaning?: string | null
          source?: string | null
          symbol: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          associated_facets?: string[] | null
          created_at?: string | null
          id?: string
          meaning?: string | null
          source?: string | null
          symbol?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personal_mythology_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price_id: string
          product_id: string | null
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price_id: string
          product_id?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price_id?: string
          product_id?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          app_scope: string | null
          created_at: string | null
          currency: string | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          price_paid: number | null
          source: string | null
          status: string | null
          stripe_checkout_id: string | null
          test_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          app_scope?: string | null
          created_at?: string | null
          currency?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          price_paid?: number | null
          source?: string | null
          status?: string | null
          stripe_checkout_id?: string | null
          test_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          app_scope?: string | null
          created_at?: string | null
          currency?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          price_paid?: number | null
          source?: string | null
          status?: string | null
          stripe_checkout_id?: string | null
          test_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          },
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          deleted: boolean | null
          deleted_at: string | null
          facet_id: string | null
          id: string
          input_type: string | null
          question_num: number | null
          test_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          deleted_at?: string | null
          facet_id?: string | null
          id?: string
          input_type?: string | null
          question_num?: number | null
          test_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          deleted_at?: string | null
          facet_id?: string | null
          id?: string
          input_type?: string | null
          question_num?: number | null
          test_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["test_id"]
          },
        ]
      }
      questions_translations: {
        Row: {
          created_at: string
          deleted: boolean | null
          deleted_at: string | null
          id: string
          image_url: string | null
          lang: string
          question_id: string | null
          questions_text: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          image_url?: string | null
          lang: string
          question_id?: string | null
          questions_text?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          image_url?: string | null
          lang?: string
          question_id?: string | null
          questions_text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_translations_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          app_scope: string | null
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          numeric_answer: number | null
          question_id: string | null
          relevance: number | null
          session_id: string | null
          text_answer: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          app_scope?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          numeric_answer?: number | null
          question_id?: string | null
          relevance?: number | null
          session_id?: string | null
          text_answer?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          app_scope?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          numeric_answer?: number | null
          question_id?: string | null
          relevance?: number | null
          session_id?: string | null
          text_answer?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "test_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          app_scope: string | null
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          end_date: string | null
          id: string
          plan_name: string | null
          start_date: string | null
          status: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          app_scope?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string | null
          start_date?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          app_scope?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string | null
          start_date?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      test_sessions: {
        Row: {
          ai_analysis: Json | null
          completed_at: string | null
          created_at: string
          data: Json | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          lang: string | null
          pdf_url: string | null
          started_at: string | null
          status: string | null
          test_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_analysis?: Json | null
          completed_at?: string | null
          created_at?: string
          data?: Json | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          lang?: string | null
          pdf_url?: string | null
          started_at?: string | null
          status?: string | null
          test_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_analysis?: Json | null
          completed_at?: string | null
          created_at?: string
          data?: Json | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          lang?: string | null
          pdf_url?: string | null
          started_at?: string | null
          status?: string | null
          test_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tests: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string
          deleted: boolean | null
          deleted_at: string | null
          description: string | null
          image_url: string | null
          lang: string
          price: number | null
          test_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          image_url?: string | null
          lang?: string
          price?: number | null
          test_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          image_url?: string | null
          lang?: string
          price?: number | null
          test_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_bundles: {
        Row: {
          app_scope: string | null
          bundle_id: string | null
          created_at: string | null
          currency: string | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          price_paid: number | null
          source: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          app_scope?: string | null
          bundle_id?: string | null
          created_at?: string | null
          currency?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          price_paid?: number | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          app_scope?: string | null
          bundle_id?: string | null
          created_at?: string | null
          currency?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          price_paid?: number | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_bundles_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_bundles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      user_journal: {
        Row: {
          ai_feedback: Json | null
          app_scope: string | null
          content: string
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          is_private: boolean | null
          mood: string | null
          tags: string[] | null
          user_id: string | null
        }
        Insert: {
          ai_feedback?: Json | null
          app_scope?: string | null
          content: string
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          is_private?: boolean | null
          mood?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Update: {
          ai_feedback?: Json | null
          app_scope?: string | null
          content?: string
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          is_private?: boolean | null
          mood?: string | null
          tags?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_journal_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      user_memory: {
        Row: {
          app_scope: string | null
          confidence: number | null
          id: string
          key: string
          last_updated: string | null
          source: string | null
          user_id: string | null
          value: Json | null
        }
        Insert: {
          app_scope?: string | null
          confidence?: number | null
          id?: string
          key: string
          last_updated?: string | null
          source?: string | null
          user_id?: string | null
          value?: Json | null
        }
        Update: {
          app_scope?: string | null
          confidence?: number | null
          id?: string
          key?: string
          last_updated?: string | null
          source?: string | null
          user_id?: string | null
          value?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_memory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile: {
        Row: {
          age_group: string | null
          communication_style: string | null
          display_name: string | null
          gender: string | null
          main_goal: string | null
          user_id: string
        }
        Insert: {
          age_group?: string | null
          communication_style?: string | null
          display_name?: string | null
          gender?: string | null
          main_goal?: string | null
          user_id: string
        }
        Update: {
          age_group?: string | null
          communication_style?: string | null
          display_name?: string | null
          gender?: string | null
          main_goal?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users_basic"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      users_basic: {
        Row: {
          banned_until: string | null
          created_at: string | null
          email: string | null
          email_confirmed_at: string | null
          id: string | null
          is_anonymous: boolean | null
          last_sign_in_at: string | null
        }
        Insert: {
          banned_until?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmed_at?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          last_sign_in_at?: string | null
        }
        Update: {
          banned_until?: string | null
          created_at?: string | null
          email?: string | null
          email_confirmed_at?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          last_sign_in_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
