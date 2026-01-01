"use client"

import { Settings, Bell, Shield, Database, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-slate-600/50">
          <Settings className="h-6 w-6 text-slate-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">System configuration and preferences</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notification Settings */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-slate-400">Receive updates via email</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Alert Thresholds</p>
                <p className="text-sm text-slate-400">Set risk and deadline alerts</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Two-Factor Authentication</p>
                <p className="text-sm text-slate-400">Enhanced account security</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Session Timeout</p>
                <p className="text-sm text-slate-400">Auto-logout after inactivity</p>
              </div>
              <Button variant="outline" size="sm">30 mins</Button>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Data Retention</p>
                <p className="text-sm text-slate-400">Archive policy settings</p>
              </div>
              <Button variant="outline" size="sm">7 years</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Audit Logging</p>
                <p className="text-sm text-slate-400">System activity tracking</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Regional Settings */}
        <Card className="bg-slate-800/50">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-yellow-400" />
              Regional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Currency</p>
                <p className="text-sm text-slate-400">Default display currency</p>
              </div>
              <Button variant="outline" size="sm">AED</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Date Format</p>
                <p className="text-sm text-slate-400">Display date format</p>
              </div>
              <Button variant="outline" size="sm">DD/MM/YYYY</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
