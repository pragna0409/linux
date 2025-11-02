# Supabase Setup Instructions

## Step 1: Install Supabase Package

Run this command in your project directory:
```bash
npm install @supabase/supabase-js
```

If you encounter PowerShell execution policy errors, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

## Step 2: Create Table in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: `jqflseisyystddvorsue`
3. Go to **SQL Editor**
4. Copy and paste the SQL from `supabase_table_schema.sql`
5. Click **Run** to execute the SQL

This will create the `registrations` table with the following columns:
- `id` (auto-increment primary key)
- `name` (text)
- `email` (text, unique with phone)
- `phone` (text, unique with email)
- `os` (text - linux/windows)
- `timestamp` (timestamp)
- `created_at` (timestamp)

## Step 3: Configure Environment Variable

1. Get your Supabase **anon/public key** from:
   - Supabase Dashboard → Settings → API → `anon public` key

2. Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_KEY=your_anon_key_here
   ```

   **Important:** Replace `your_anon_key_here` with your actual Supabase anon key.

3. Restart your React development server after adding the `.env` file:
   ```bash
   npm start
   ```

## Step 4: Test the Integration

1. Start your React app: `npm start`
2. Register a new user through the registration form
3. Check your Supabase dashboard → Table Editor → `registrations` table
4. You should see the registration data appear in the table

## How It Works

- **Registration**: When users register, data is saved to both Supabase and localStorage (as backup)
- **Dashboard**: Admin dashboard fetches all registrations from Supabase
- **Duplicate Check**: Checks Supabase first, then falls back to localStorage
- **Offline Support**: If Supabase is unavailable, falls back to localStorage

## Row Level Security (RLS)

The table schema includes RLS policies that allow public read/write access. If you want to restrict access:

1. Go to Supabase Dashboard → Authentication → Policies
2. Modify or remove the public policies
3. Create authenticated-only policies if needed

## Troubleshooting

**Error: "relation 'registrations' does not exist"**
- Make sure you ran the SQL schema in Step 2

**Error: "Invalid API key"**
- Check that your `.env` file has the correct `REACT_APP_SUPABASE_KEY`
- Restart your development server after creating `.env`

**Registrations not saving**
- Check browser console for errors
- Verify your Supabase RLS policies allow insert operations
- Check Supabase Dashboard → Logs for any errors

