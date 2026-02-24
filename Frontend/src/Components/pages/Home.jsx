import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-emerald-100/40">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="bg-grid absolute inset-0 opacity-40"></div>
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="ui-sans text-xs uppercase tracking-[0.3em] text-emerald-600">
                Trusted hospital network
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
                Care that feels personal, powered by modern systems.
              </h1>
              <p className="ui-sans mt-4 max-w-xl text-base text-emerald-700 sm:text-lg">
                Book appointments, manage services, and stay connected with doctors in one
                clean dashboard designed for patients and staff.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/appointments"
                  className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
                >
                  Book appointment
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-50 transition"
                >
                  Explore services
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
                <p className="ui-sans text-xs uppercase tracking-[0.2em] text-emerald-500">Live updates</p>
                <h3 className="mt-3 text-xl font-semibold text-emerald-900">
                  See doctor availability at a glance.
                </h3>
                <p className="ui-sans mt-2 text-sm text-emerald-600">
                  Real-time slots and instant confirmation across all departments.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-900 p-5 text-white shadow-sm">
                <p className="ui-sans text-xs uppercase tracking-[0.2em] text-emerald-200">Patient-first</p>
                <h3 className="mt-3 text-xl font-semibold">
                  Secure access for patients and staff.
                </h3>
                <p className="ui-sans mt-2 text-sm text-emerald-100">
                  Clerk authentication with role-based access keeps everything safe.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
                <p className="ui-sans text-xs uppercase tracking-[0.2em] text-emerald-500">Smart workflow</p>
                <h3 className="mt-3 text-xl font-semibold text-emerald-900">
                  Reduce admin time by 40%.
                </h3>
                <p className="ui-sans mt-2 text-sm text-emerald-600">
                  Automated reminders, payments, and staff scheduling.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
