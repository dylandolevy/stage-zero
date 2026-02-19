// lib/requireAdmin.js
import { supabaseServer } from './supabaseServer'

export async function requireAdmin(req) {
  // Expect Authorization: Bearer <access_token>
  const authHeader = req.headers.get ? req.headers.get('authorization') : req.headers?.authorization
  if (!authHeader) throw { status: 401, message: 'Missing authorization' }

  const token = authHeader.split(' ')[1]
  if (!token) throw { status: 401, message: 'Invalid authorization format' }

  // Verify token and get user
  const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
  if (userError || !userData?.user) throw { status: 401, message: 'Invalid token' }

  const userEmail = userData.user.email
  if (!userEmail) throw { status: 403, message: 'No email on user' }

  // Check admins table
  const { data: admins, error: adminError } = await supabaseServer
    .from('admins')
    .select('email')
    .eq('email', userEmail)
    .limit(1)

  if (adminError) throw { status: 500, message: adminError.message }
  if (!admins || admins.length === 0) throw { status: 403, message: 'Not an admin' }

  // return the user object for downstream use
  return userData.user
}
