import React, { useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import slugify from 'slugify'
import Sidebar from '../components/Sidebar'
import { IconFile, IconSend } from '@tabler/icons-react'
import Categories from '../categories.json'
import ReactSelectCreatable from 'react-select/creatable'
export default function CreatePost() {
	const [decodedToken, setDecodedToken] = useState(null)

	const [form, setForm] = useState({
		title: 'Add new thought',
		slug: '',
		description: 'Add your thought description here',
		userId: '',
		content: 'Add post content here',
		visibility: 'public',
		isDraft: false,
		isDisableComment: false,
		category: '',
	})

	const getCookieValue = (name) => {
		const cookies = document.cookie.split(';')
		for (let cookie of cookies) {
			const [cookieName, cookieValue] = cookie.trim().split('=')
			if (cookieName === name) {
				return cookieValue
			}
		}
		return null
	}

	const handleEditorChange = (content) => {
		setForm({ ...form, content })
	}

	function HandleTyping(e) {
		const slug = slugify(form.title, { lower: true })
		setForm({
			...form,
			[e.target.name]: e.target.value,
			slug: slug,
			category: e.value,
		})
	}

	const generateSlug = (e) => {
		const slug = slugify(e.target.value, { lower: true })
		setForm({ ...form, slug })
	}

	const selectCategory = (e) => {
		setForm({ ...form, category: e.value })
	}

	const sendContentToServer = async () => {
		try {
			//const response = await axios.post('/api/content', { content })
			//console.log('Content sent to server:', textData)
			console.log(form)
		} catch (error) {
			console.error('Error sending content to server:', error)
		}
	}

	function commentsOption(e) {
		const isDisableComment = e.target.checked

		setForm({ ...form, isDisableComment })
	}

	useEffect(() => {
		const slug = slugify(form.title, { lower: true })
		setForm((prevForm) => ({
			...prevForm,
			slug: slug,
		}))
	}, [form.title])

	useEffect(() => {
		const refreshToken = getCookieValue('refreshToken')
		const decode = jwtDecode(refreshToken)
		setDecodedToken(decode)

		if (decode) {
			setForm((prevForm) => ({
				...prevForm,
				userId: decode.userId,
			}))
		}
	}, [])

	return (
		<div>
			<div className="flex w-full gap-4 bg-white">
				<div className="w-[20%]">
					<Sidebar />
				</div>

				<div className="flex flex-col gap-2 px-6 py-4">
					<div className="flex flex-col gap-2">
						<input
							className="px-5 py-2 text-2xl border-b-2 outline-none focus:border-yellow-500"
							type="text"
							name="title"
							value={form.title}
							onChange={HandleTyping}
							defaultValue={'Add new thought'}
							placeholder="Title"
						/>
						<span className="flex text-xs text-gray-500 ">
							Permalink : thought.site/
							<input
								className="border-yellow-500 outline-none focus:border-b-2"
								type="text"
								maxLength={30}
								defaultValue={form.slug}
								name="slug"
								value={form.slug}
								onChange={generateSlug}
							/>
						</span>
						<input
							className="px-5 pt-3 pb-1 text-sm border-b-2 outline-none focus:border-yellow-500"
							type="text"
							name="description"
							value={form.description}
							onChange={HandleTyping}
							defaultValue={'Add new thought'}
							placeholder="Add Description"
						/>
						<div className="py-3">
							<ReactSelectCreatable
								defaultValue={[Categories[2]]}
								name="category"
								onChange={selectCategory}
								options={Categories}
								className="z-10 h-8 outline-none basic-multi-select"
								classNamePrefix="select"
								placeholder="Select or create categories..."
							/>
						</div>
					</div>
					<Editor
						apiKey="jrst5pqxpydwd6r1o1xq7mzhy7bkjrexex6in3y51vcfo1xr"
						init={{
							plugins:
								'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
							toolbar:
								'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags  | customOption | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
							tinycomments_mode: 'embedded',
							tinycomments_author: 'You',
							ai_request: (request, respondWith) =>
								respondWith.string(() =>
									Promise.reject('See docs to implement AI Assistant')
								),
						}}
						initialValue={form.content}
						onEditorChange={handleEditorChange}
					/>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-sm">
							<label htmlFor="selectDropdown">Visibility :</label>
							{/* Select dropdown with id for the label */}
							<select
								onChange={HandleTyping}
								className="bg-white"
								name="visibility"
								value={form.visibility}
								id="selectDropdown">
								<option value="public">Public</option>
								<option value="link">By link only</option>
								<option value="private">Private</option>
							</select>

							<label>
								Disable comments
								<input
									className="ml-2"
									type="checkbox"
									onChange={commentsOption}
								/>
							</label>
						</div>
						<div className="flex items-center gap-2">
							<button
								className="bg-yellow-500 text-white rounded-lg py-1.5 px-3 text-xs flex gap-2 items-center"
								onClick={() => sendContentToServer()}>
								Post Thought
								<IconSend size={20} />
							</button>
							<button
								className="bg-white ring-1 ring-gray-500 text-gray-700 rounded-lg text-xs px-3 py-1.5 flex gap-2 items-center"
								onClick={() => sendContentToServer()}>
								Save Draft
								<IconFile size={20} stroke={1} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
